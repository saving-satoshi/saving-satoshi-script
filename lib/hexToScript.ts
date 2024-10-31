import { OpCodeHex } from 'ui/OpCodeParser/OpFunctions'

const standardOpCodes = Object.keys(OpCodeHex).filter(
  (key) => !['OP_PUSHDATA1', 'OP_PUSHDATA2', 'OP_PUSHDATA4'].includes(key)
)

export function hexToScript(scriptHex: string): string[] {
  const opcodes: string[] = []

  for (let i = 0; i < scriptHex.length; i += 2) {
    const hexByte = scriptHex.substring(i, i + 2)
    let asmOp = ''

    // Check for standard opcodes first
    if (standardOpCodes.some((key) => OpCodeHex[key] === hexByte)) {
      asmOp = standardOpCodes.find(
        (key) => OpCodeHex[key] === hexByte
      ) as string
    }

    // Handle variable-length OP_PUSHBYTES and OP_PUSHDATA#
    if (asmOp === '') {
      const length = parseInt(hexByte, 16) // Length byte

      if (length >= 1 && length <= 75) {
        // OP_PUSHBYTES_1 to OP_PUSHBYTES_75
        const data = scriptHex.substring(i + 2, i + 2 + length * 2)
        opcodes.push('OP_PUSH', data) // Push OP_PUSH and data separately
        i += length * 2 // Skip the data bytes
      } else if (hexByte === OpCodeHex.OP_PUSHDATA1) {
        // OP_PUSHDATA1 (next byte indicates the length)
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 4), 16) // Read the next byte for length
        const data = scriptHex.substring(i + 4, i + 4 + dataLength * 2)
        opcodes.push('OP_PUSH', data) // Push OP_PUSH and data separately
        i += 2 + dataLength * 2 // Skip length byte and data
      } else if (hexByte === OpCodeHex.OP_PUSHDATA2) {
        // OP_PUSHDATA2 (next 2 bytes indicate the length)
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 6), 16) // Read the next 2 bytes for length
        const data = scriptHex.substring(i + 6, i + 6 + dataLength * 2)
        opcodes.push('OP_PUSH', data) // Push OP_PUSH and data separately
        i += 4 + dataLength * 2 // Skip length bytes and data
      } else if (hexByte === OpCodeHex.OP_PUSHDATA4) {
        // OP_PUSHDATA4 (next 4 bytes indicate the length)
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 10), 16) // Read the next 4 bytes for length
        const data = scriptHex.substring(i + 10, i + 10 + dataLength * 2)
        opcodes.push('OP_PUSH', data) // Push OP_PUSH and data separately
        i += 6 + dataLength * 2 // Skip length bytes and data
      } else {
        opcodes.push(`unknown ${hexByte}`) // Push unknown opcode as a separate item
      }
    } else {
      opcodes.push(asmOp) // Add the opcode to the array
    }
  }

  return opcodes
}
