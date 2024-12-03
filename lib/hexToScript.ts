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

    if (asmOp === '') {
      const length = parseInt(hexByte, 16)

      if (length >= 1 && length <= 75) {
        const dataHex = scriptHex.substring(i + 2, i + 2 + length * 2)
        const dataBytes = Buffer.from(dataHex, 'hex')

        let data
        if (isPrintableAscii(dataBytes)) {
          data = dataBytes.toString('utf-8')
        } else {
          data = dataBytes.toString('hex')
        }

        opcodes.push('OP_PUSH', data)
        i += length * 2 // Skip the data bytes
      } else if (hexByte === OpCodeHex.OP_PUSHDATA1) {
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 4), 16)
        const dataHex = scriptHex.substring(i + 4, i + 4 + dataLength * 2)
        const dataBytes = Buffer.from(dataHex, 'hex')

        let data
        if (isPrintableAscii(dataBytes)) {
          data = dataBytes.toString('utf-8')
        } else {
          data = dataBytes.toString('hex')
        }

        opcodes.push('OP_PUSH', data)
        i += 2 + dataLength * 2
      } else if (hexByte === OpCodeHex.OP_PUSHDATA2) {
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 6), 16)
        const dataHex = scriptHex.substring(i + 6, i + 6 + dataLength * 2)
        const dataBytes = Buffer.from(dataHex, 'hex')

        let data
        if (isPrintableAscii(dataBytes)) {
          data = dataBytes.toString('utf-8')
        } else {
          data = dataBytes.toString('hex')
        }

        opcodes.push('OP_PUSH', data)
        i += 4 + dataLength * 2
      } else if (hexByte === OpCodeHex.OP_PUSHDATA4) {
        const dataLength = parseInt(scriptHex.substring(i + 2, i + 10), 16)
        const dataHex = scriptHex.substring(i + 10, i + 10 + dataLength * 2)
        const dataBytes = Buffer.from(dataHex, 'hex')

        let data
        if (isPrintableAscii(dataBytes)) {
          data = dataBytes.toString('utf-8')
        } else {
          data = dataBytes.toString('hex')
        }

        opcodes.push('OP_PUSH', data)
        i += 6 + dataLength * 2
      } else {
        opcodes.push(`unknown ${hexByte}`)
      }
    } else {
      opcodes.push(asmOp)
    }
  }

  return opcodes
}
