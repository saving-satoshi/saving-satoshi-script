import { OpCodeHex } from 'ui/OpCodeParser/OpFunctions'

const standardOpCodes = Object.keys(OpCodeHex).filter(
  (key) => !['OP_PUSHDATA1', 'OP_PUSHDATA2', 'OP_PUSHDATA4'].includes(key)
)

function isPrintableAscii(bytes) {
  return bytes.every((byte) => byte >= 32 && byte <= 126)
}

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
        const dataHex = scriptHex.substring(i + 2, i + 2 + length * 2) // Extract the hex substring
        const dataBytes = Buffer.from(dataHex, 'hex') // Convert hex string to bytes

        // Decide whether to treat the data as a string or a number
        let data
        if (isPrintableAscii(dataBytes)) {
          data = dataBytes.toString('utf-8') // Decode as UTF-8 string
        } else {
          data = dataBytes.readUIntBE(0, dataBytes.length).toString() // Decode as a big-endian integer
        }

        opcodes.push('OP_PUSH', data) // Push OP_PUSH and data
        i += length * 2 // Skip the data bytes
      } else if (hexByte === OpCodeHex.OP_PUSHDATA1) {
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 4), 16) // Read the next byte for length
        const dataHex = scriptHex.substring(i + 4, i + 4 + dataLength * 2) // Extract the hex substring
        const dataBytes = Buffer.from(dataHex, 'hex')

        let data
        if (isPrintableAscii(dataBytes)) {
          data = dataBytes.toString('utf-8')
        } else {
          data = dataBytes.readUIntBE(0, dataBytes.length).toString()
        }

        opcodes.push('OP_PUSH', data)
        i += 2 + dataLength * 2
      } else if (hexByte === OpCodeHex.OP_PUSHDATA2) {
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 6), 16) // Read the next 2 bytes for length
        const dataHex = scriptHex.substring(i + 6, i + 6 + dataLength * 2)
        const dataBytes = Buffer.from(dataHex, 'hex')

        let data
        if (isPrintableAscii(dataBytes)) {
          data = dataBytes.toString('utf-8')
        } else {
          data = dataBytes.readUIntBE(0, dataBytes.length).toString()
        }

        opcodes.push('OP_PUSH', data)
        i += 4 + dataLength * 2
      } else if (hexByte === OpCodeHex.OP_PUSHDATA4) {
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 10), 16) // Read the next 4 bytes for length
        const dataHex = scriptHex.substring(i + 10, i + 10 + dataLength * 2)
        const dataBytes = Buffer.from(dataHex, 'hex')

        let data
        if (isPrintableAscii(dataBytes)) {
          data = dataBytes.toString('utf-8')
        } else {
          data = dataBytes.readUIntBE(0, dataBytes.length).toString()
        }

        opcodes.push('OP_PUSH', data)
        i += 6 + dataLength * 2
      } else {
        opcodes.push(`unknown ${hexByte}`) // Push unknown opcode as a separate item
      }
    } else {
      opcodes.push(asmOp) // Add the opcode to the array
    }
  }

  return opcodes
}
