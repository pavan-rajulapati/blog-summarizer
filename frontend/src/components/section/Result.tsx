
interface ResultProps {
    content : string;
    title : string
}

const Result = ({content, title} : ResultProps) => {
  return (
    <>
    {content && (
        <section className="w-full bg-white/10 z-10 p-4 mt-4 rounded-xl border lg:w-3xl">
            <h1 className="text-xl mb-3 font-bold tracking-wider">{title}</h1>
            <p>{content}</p>
        </section>
    )}
    </>
  )
}

export default Result