import Link from 'next/link'

function Home() {
  return (
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={"/representative/all"}>Representative</Link>
        </li>
      </ul>
  )
}

export default Home