'use client'

import { Component } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  DraggableLocation,
} from 'react-beautiful-dnd'
import { uuid } from 'utils'
import clsx from 'clsx'
import { OpCodeTypes } from '../OpCodeParser/OpFunctions'
import { hexToScript } from 'lib/hexToScript'

type ItemType = {
  id: string
  index: number
  content: string
  category: string
}

interface Group {
  heading: string
  items: ItemType[]
}

type StateType = {
  [key: string]: ItemType[]
}

const disabledOpCodes: string[] = ['INITIAL_STACK']

const reorder = (
  list: ItemType[],
  startIndex: number,
  endIndex: number
): ItemType[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const copy = (
  source: ItemType[],
  destination: ItemType[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): ItemType[] => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const item = sourceClone[droppableSource.index]

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() })
  return destClone
}

const move = (
  source: ItemType[],
  destination: ItemType[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): StateType => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result: StateType = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

const remove = (
  source: ItemType[],
  droppableSource: DraggableLocation
): ItemType[] => {
  const sourceClone = Array.from(source)
  sourceClone.splice(droppableSource.index, 1)
  return sourceClone
}

const ITEMS: ItemType[] = Object.keys(OpCodeTypes)
  .filter((key) => !disabledOpCodes.includes(key))
  .map((item, index) => ({
    id: uuid(),
    index: index,
    content: item,
    category: OpCodeTypes[item],
  }))

const groupedItems: Group[] = ITEMS.reduce(
  (groups: Group[], item: ItemType) => {
    const group = groups.find((g) => g.heading === item.category)
    if (group) {
      group.items.push(item)
    } else {
      groups.push({
        heading: item.category,
        items: [item],
      })
    }
    return groups
  },
  []
)

interface ScratchDndProps {
  items?: string[]
  prePopulate?: boolean
  onItemsUpdate?: (items: string[]) => void
}

interface ScratchDndState {
  dynamicState: StateType
  opPushValues: { [key: string]: string }
}

export default class ScratchDnd extends Component<
  ScratchDndProps,
  ScratchDndState
> {
  constructor(props: ScratchDndProps) {
    super(props)

    let opPushValues: { [key: string]: string } = {}

    const initialStateItems: ItemType[] = []
    if (props.prePopulate && props.items) {
      for (let i = 0; i < props.items.length; i++) {
        const item = props.items[i]
        const id = uuid()

        if (item === 'OP_PUSH' && props.items[i + 1]) {
          // Add the following item to opPushValues and skip it in the state
          opPushValues[id] = props.items[i + 1].toUpperCase()
          i++ // Skip the next item
        }

        initialStateItems.push({
          id,
          index: initialStateItems.length,
          content: item,
          category: '', // Adjust the category if needed
        })
      }
    }

    this.state = {
      dynamicState: {
        [uuid()]: initialStateItems,
      },
      opPushValues,
    }
  }

  handleOpPushChange = (
    id: string,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event?.target
    const caretPosition = input?.selectionStart

    this.setState(
      (prevState) => ({
        opPushValues: {
          ...prevState.opPushValues,
          [id]: value.toUpperCase(),
        },
      }),
      () => {
        input.setSelectionRange(caretPosition, caretPosition)
      }
    )
  }

  handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()

      const hexRegex = /^(0x)?[0-9a-fA-F]+$/
      const newItems =
        (hexRegex.test(text) && hexToScript(text)) || text.split(' ')
      const newOpPushValues: { [key: string]: string } = {}
      const updatedItems: ItemType[] = []

      //if no items are opcodes break as the top item of the clipboard is wrong
      if (
        newItems.filter((value) => Object.keys(OpCodeTypes).includes(value))
          .length === 0
      ) {
        throw new Error('clipboard does not contain opcodes')
      }

      for (let i = 0; i < newItems.length; i++) {
        const item = newItems[i]
        const id = uuid()

        if (item === 'OP_PUSH' && newItems[i + 1]) {
          newOpPushValues[id] = newItems[i + 1].toUpperCase()
          i++
        }

        updatedItems.push({
          id,
          index: updatedItems.length,
          content: item,
          category: OpCodeTypes[item],
        })
      }

      const listId = Object.keys(this.state.dynamicState)[0] || uuid()

      this.setState((prevState) => ({
        dynamicState: {
          ...prevState.dynamicState,
          [listId]: [...prevState.dynamicState[listId], ...updatedItems],
        },
        opPushValues: {
          ...prevState.opPushValues,
          ...newOpPushValues,
        },
      }))
    } catch (error) {
      console.error('Failed to read clipboard:', error)
    }
  }

  handleItemClick = (item: ItemType) => {
    const newItem = { ...item, id: uuid() }
    const listId = Object.keys(this.state.dynamicState)[0]

    this.setState((prevState) => ({
      dynamicState: {
        ...prevState.dynamicState,
        [listId]: [...prevState.dynamicState[listId], newItem],
      },
    }))
  }

  onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      if (source.droppableId !== 'ITEMS') {
        const newState = { ...this.state.dynamicState }
        const newSourceList = remove(newState[source.droppableId], source)

        this.setState({
          dynamicState: {
            ...newState,
            [source.droppableId]: newSourceList,
          },
        })
      }
      return
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          dynamicState: {
            ...this.state.dynamicState,
            [destination.droppableId]: reorder(
              this.state.dynamicState[source.droppableId],
              source.index,
              destination.index
            ),
          },
        })
        break
      case 'ITEMS':
        this.setState({
          dynamicState: {
            ...this.state.dynamicState,
            [destination.droppableId]: copy(
              ITEMS,
              this.state.dynamicState[destination.droppableId],
              source,
              destination
            ),
          },
        })
        break
      default:
        this.setState({
          dynamicState: move(
            this.state.dynamicState[source.droppableId],
            this.state.dynamicState[destination.droppableId],
            source,
            destination
          ),
        })
        break
    }
  }

  componentDidUpdate(prevProps: ScratchDndProps) {
    // Check if the incoming items or prePopulate props have changed
    if (
      prevProps.items !== this.props.items ||
      prevProps.prePopulate !== this.props.prePopulate
    ) {
      // Reset the state with the new items
      const newItems = this.props.items || []
      const newOpPushValues: { [key: string]: string } = {}
      const newInitialStateItems: ItemType[] = []

      for (let i = 0; i < newItems.length; i++) {
        const item = newItems[i]
        const id = uuid()

        if (item === 'OP_PUSH' && newItems[i + 1]) {
          newOpPushValues[id] = newItems[i + 1].toUpperCase()
          i++ // Skip the next item
        }

        newInitialStateItems.push({
          id,
          index: newInitialStateItems.length,
          content: item,
          category: '', // Adjust the category if needed
        })
      }

      // Update state with the new items and opPushValues
      this.setState({
        dynamicState: {
          [uuid()]: newInitialStateItems,
        },
        opPushValues: newOpPushValues,
      })
    }

    // Existing logic for handling updates to dynamicState and opPushValues
    const updatedItems = Object.values(this.state.dynamicState).flatMap((arr) =>
      arr.map((item) => item)
    )

    const processedItems = updatedItems.flatMap((item) => {
      if (item.content === 'OP_PUSH') {
        const pushValueContent = this.state.opPushValues[item.id] || ''
        return [item.content, pushValueContent]
      } else {
        return [item.content]
      }
    })

    if (this.props.onItemsUpdate) {
      this.props.onItemsUpdate(processedItems)
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {Object.keys(this.state.dynamicState).map((list, i) => {
          return (
            <div key={i} className="border-b border-white/25 px-5 pt-[15px]">
              <p className="font-space-mono text-[15px] font-bold">
                Your script
              </p>
              <Droppable key={list} droppableId={list} direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    className={clsx(
                      'flex h-[40px] w-full flex-row whitespace-nowrap font-space-mono',
                      {
                        'overflow-hidden':
                          this.state.dynamicState[list].length === 0,
                        'overflow-x-auto overflow-y-hidden':
                          this.state.dynamicState[list].length > 0,
                      }
                    )}
                    ref={provided.innerRef}
                  >
                    {this.state.dynamicState[list].length ? (
                      this.state.dynamicState[list].map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              id={item.id}
                              className={clsx(
                                'relative mr-[5px] flex h-[25px] select-none items-center rounded-sm bg-black/30 text-[13px] font-normal text-white'
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={provided.draggableProps.style}
                            >
                              <span
                                className={clsx(
                                  'flex items-center whitespace-nowrap',
                                  {
                                    'px-1.5': item.content !== 'OP_PUSH',
                                    'pl-1.5': item.content === 'OP_PUSH',
                                  }
                                )}
                              >
                                {item.content}
                                {item.content === 'OP_PUSH' && (
                                  <input
                                    key={item.id}
                                    id={item.id}
                                    className="ml-2 mr-1 h-5 w-auto grow bg-white/20 px-1 text-white placeholder:text-white/50"
                                    placeholder="PUSH_DATA"
                                    type="text"
                                    value={
                                      this.state.opPushValues[item.id] || ''
                                    }
                                    onChange={(e) =>
                                      this.handleOpPushChange(
                                        item.id,
                                        e.target.value,
                                        e
                                      )
                                    }
                                  />
                                )}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className="relative flex h-[40px] min-w-full select-none content-center items-start justify-start overflow-hidden text-[15px] text-white/50">
                        Drag OP_CODES here to build your script...
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
        <Droppable
          droppableId="ITEMS"
          isDropDisabled={true}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              className="flex h-full flex-col gap-y-2.5 overflow-y-auto bg-black/10 px-5 py-[15px]"
              dir="rtl"
              ref={provided.innerRef}
            >
              {groupedItems.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex flex-row-reverse font-space-mono"
                >
                  <h2 className="w-fit min-w-[100px] select-none text-left text-[13px] font-semibold">
                    {group.heading}
                  </h2>
                  <div className="flex w-full flex-row-reverse flex-wrap gap-y-2.5 overflow-x-auto pl-1">
                    {group.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={item.index}
                      >
                        {(provided, snapshot) => (
                          <>
                            <div
                              id={item.id}
                              className={clsx(
                                'relative mr-[5px] flex h-[25px] select-none items-center rounded-sm bg-black/30 text-[13px] font-normal text-white'
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={provided.draggableProps.style}
                              onClick={() => this.handleItemClick(item)}
                            >
                              <span
                                className={clsx('flex items-center', {
                                  'px-1.5': item.content !== 'OP_PUSH',
                                  'pl-1.5': item.content === 'OP_PUSH',
                                })}
                              >
                                {item.content === 'OP_PUSH' && (
                                  <input
                                    key={item.id}
                                    id={item.id}
                                    className={clsx(
                                      'pointer-events-none ml-2 mr-1 w-auto cursor-text rounded-sm bg-white/20 px-1 text-left placeholder:text-white/50'
                                    )}
                                    type="text"
                                    placeholder="PUSH_DATA"
                                  />
                                )}
                                {item.content}
                              </span>
                            </div>
                            {snapshot.isDragging && (
                              <div className="clone">
                                <div
                                  className={clsx(
                                    'relative mr-[5px] flex h-[25px] select-none items-center rounded-sm bg-black/30 text-[13px] font-normal text-white'
                                  )}
                                >
                                  <span
                                    className={clsx('flex items-center', {
                                      'px-1.5': item.content !== 'OP_PUSH',
                                      'pl-1.5': item.content === 'OP_PUSH',
                                    })}
                                  >
                                    {item.content === 'OP_PUSH' && (
                                      <input
                                        key={item.id}
                                        id={item.id}
                                        className={clsx(
                                          'pointer-events-none ml-2 mr-1 h-5 w-auto cursor-text rounded-sm bg-white/20 px-1 text-left placeholder:text-white/50'
                                        )}
                                        type="text"
                                        placeholder="PUSH_DATA"
                                      />
                                    )}
                                    {item.content}
                                  </span>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="flex justify-end bg-black/10">
          <button
            className="false m-2 inline-block max-w-[max-content] justify-center rounded-[3px] bg-white px-12 px-2.5 py-1 text-center font-nunito text-base font-bold  text-back transition duration-150 ease-in-out hover:bg-white/75"
            onClick={() => this.handlePasteFromClipboard()}
          >
            Paste From Clipboard
          </button>
        </div>
      </DragDropContext>
    )
  }
}
