import Link from 'next/link'
import {GetStaticProps} from "next";
import {RepresentativeService} from "../services/RepresentativeService";
import representativeStore from "../stores/representativeStore";
import FacilityForm from '../components/forms/FacilityForm';

function Home() {
  return (
    <div>
      <FacilityForm />
    </div>
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