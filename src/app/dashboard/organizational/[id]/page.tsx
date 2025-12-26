
// type Props = {
//     params: Promise<{ id: string }>;
//     searchParams: Promise<{ name?: string }>;
//   };

type Props = {
  params: Promise<{id: string}>;
  searchParams : Promise<{name: string}>;
}

export default async function PageDetailOrg({params, searchParams}: Props){
  const {id} = await params;
  const{name} = await searchParams;


  return(
    <main>
      <div>
        <h1>Org Detail</h1>
        <br />
        Id: {id} <br />
        Name : {name}
      </div>
    </main>
  )
}