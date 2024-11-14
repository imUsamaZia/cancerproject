

export async function GetCancerSearch({ cancerSearch }) {

    
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI || 'http://localhost:3000'}/api/cancer-search`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({cancerSearch}),
    // }
    // );
    

    // const data = await res.json();
   const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/cancer/v1/search?term=${cancerSearch.toLowerCase()}`).then(res => res.json())

    return data;
}