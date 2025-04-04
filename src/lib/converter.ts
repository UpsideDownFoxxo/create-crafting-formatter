import { Err, InvalidTypeError, Ok, type Result } from "./results";

const B32CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUV"

export function toBase32(n: bigint, segs: number) {
  let o = ""

  while (n > BigInt("0")) {
    const r = n % BigInt(32);
    o = B32CHARS[Number(r)] + o;
    n = (n / BigInt(32));
  }

  o = "0".repeat(segs * 3 - o.length) + o
  o = "__ ".repeat((15 - o.length) / 3) + o

  return o;
}

export function fromBase8(s: string): Result<[bigint, string, number], InvalidTypeError> {
  if (s.length == 0) {
    return Err("Sequence too short")
  }

  if (s.length > 25) {
    return Err("Sequence too long")
  }

  if (/[^0-7]/.test(s)) {
    return Err("Unsupported Character in sequence")
  }

  const chars = s.split("");
  let n = BigInt(0);

  let c;
  while ((c = chars.pop())) {
    n *= BigInt(8)
    n += BigInt(c)
  }

  const segments = Math.ceil(s.length / 5)

  const nStr = "0".repeat(15 * segments - n.toString(2).length) + n.toString(2)
  const bin = nStr.split("").reverse().reduce((a, e, i) => (i % 3 === 2 ? ' ' : '') + e + a, '')
  return Ok([n, bin, segments])
}

