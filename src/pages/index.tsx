import Link from 'next/link'
import {GetStaticProps} from "next";
import {RepresentativeService} from "../services/RepresentativeService";
import representativeStore from "../stores/representativeStore";

function Home() {
  return (
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={"/representatives/all"}>Representative</Link>
        </li>
      </ul>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
    console.log("AAAAAAAAAAAAAAAAAA")
    RepresentativeService.getAllRepresentative();
    return {
        props: {
            representatives: representativeStore.representatives,
        },
    };
}