import { useEffect, useState } from 'react'

export default function JPTEST() {
  const [name, setName] = useState('JPTEST')
  useEffect(() => {
    setName('JPTEST2')
  }, [])
  return <div>{name}</div>
}
