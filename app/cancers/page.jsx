import CancerList from '@/components/Cancers-listing/cancers-list'
import {GET_ALL_CANCERS, GET_CANCER_PAGE, GET_PAGE_SEO} from '@/lib/Queries'
import client from '@/lib/ApolloClient';
import dynamic from "next/dynamic";


export async function generateMetadata() {
    const res = await client.request(
      GET_PAGE_SEO,
      // variables are type-checked too!
      { id: 'cancers-seo' }
    );
  
    const seo = res?.page?.seo || {};
 
    return {
      title: seo?.title || "",
      description: seo?.metaDesc || "",
      keywords: `${seo.focuskw},${seo?.metaKeywords}`,
      alternates: {
        canonical: `https://www.cancerify.com/cancers`,
      },
      openGraph: {
        images: seo?.opengraphImage?.sourceUrl
          ? [{ url: seo?.opengraphImage?.sourceUrl }]
          : [],
      },
    };
  }

  const data = [
    {
        title: "What are the most common cancers worldwide?",
        excerpt: "The most common cancers globally include breast, lung, prostate, colorectal, and skin (melanoma) cancers. Other prevalent types are bladder, brain, cervical, endometrial, esophageal, kidney, laryngeal, leukemia, liver, non-Hodgkin lymphoma, oral, ovarian, pancreatic, stomach, and thyroid cancers."
    },
    {
        title: "How does early detection impact cancer treatment outcomes?",
        excerpt: "Early detection significantly improves treatment success rates and survival outcomes. When cancer is found at an early stage, it is often smaller and hasn't spread, making it more responsive to less aggressive treatments and increasing the likelihood of a full recovery"
    },
    {
        title: "What advancements have been made in cancer treatments recently?",
        excerpt: "Recent advancements include targeted therapies, immunotherapies, precision medicine, and minimally invasive surgical techniques. These innovations have led to more effective treatments with fewer side effects, improving patient quality of life and survival rates."
    },
    {
        title: "Why is choosing a skilled oncologist crucial for cancer treatment?",
        excerpt: "Selecting a skilled and experienced oncologist is vital because they guide your treatment journey. A top oncologist stays updated on the latest research and therapies, providing personalized treatment plans tailored to your specific cancer type and stage. Their expertise can significantly improve your chances of successful treatment and enhance your overall quality of life during and after therapy"
    },
    {
        title: "What are the benefits of accessing top-quality cancer care?",
        excerpt: "Top-quality cancer care provides access to experienced specialists, advanced treatment options, and comprehensive support services. This can lead to better treatment outcomes, personalized care plans, and an overall improved experience during the cancer journey"
    },
    {
        title: "How does having a top oncologist influence your treatment plan?",
        excerpt: "A top oncologist leverages their extensive experience and knowledge to design the most effective treatment plans tailored to your unique condition. They have access to the latest clinical trials and cutting-edge therapies, ensuring you receive the best possible care. Their proactive approach in monitoring and adjusting treatments as needed can lead to improved outcomes and a higher quality of life"
    },
    {
        title: "How does an oncologist's expertise impact treatment outcomes?",
        excerpt: "An oncologist's expertise directly influences treatment effectiveness. Experienced oncologists can identify the most appropriate therapies, manage side effects efficiently, and adjust treatment plans as needed. Their knowledge and skills contribute to higher survival rates and better quality of life for patients."
    },
    {
        title: "What treatment options are available for different types of cancer?",
        excerpt: "There is a wide range of treatment options available for different types of cancer, tailored to each patient's specific needs. These include surgery, radiation therapy, chemotherapy, targeted therapy, immunotherapy, and hormone therapy. Additionally, advancements like personalized medicine and minimally invasive procedures have enhanced the effectiveness and reduced the side effects of treatments. Collaborating with a top oncologist ensures that you receive the most appropriate and up-to-date treatment plan, maximizing the chances of successful outcomes."
    },
    {
        title: "How can regular screenings help prevent certain cancers?",
        excerpt: "Regular screenings can detect precancerous conditions or cancer at an early, more treatable stage. Screenings like mammograms, Pap smears, colonoscopies, and skin checks play a crucial role in preventing cancer progression and increasing the chances of successful treatment."
    },
    {
        title: "What positive developments offer hope to those diagnosed with cancer?",
        excerpt: " Advances in medical research have led to innovative treatments and increased survival rates. Personalized medicine, improved therapies, and a better understanding of cancer biology provide hope that many cancers can be effectively managed or cured, allowing patients to lead fulfilling lives after diagnosis.By emphasizing the importance of choosing a skilled oncologist and providing a comprehensive overview of available treatment options, we highlight how expert medical guidance and advanced therapies can significantly influence treatment success. Access to top professionals and the latest treatments ensures that patients receive the most effective and up-to-date care possible, offering hope and motivation in the fight against cancer."
    }
  ];

const Page = async () => {
    const res = await client.request(GET_ALL_CANCERS);
    const cancers = res?.cancers?.nodes || [];
    const resPage = await client.request(GET_CANCER_PAGE, { id: 'cancers-seo' });
    const page = resPage?.page || [];

    const blocks = JSON.parse(page?.blocksJSON)
    const paragraph = blocks?.find((item)=>item?.name === "core/paragraph")?.originalContent    

    return (
        <>    
            <CancerList cancers={cancers} paragraph={paragraph} faqs={blocks}/>
        </>
    );
}

export default Page;
