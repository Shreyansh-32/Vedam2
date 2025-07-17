import Star from "./Star";

export const FeedbackRating = ({rating} : {rating : number}) => {
    const dummyArr = [undefined , undefined , undefined , undefined , undefined];
  return (
    <div className="flex gap-1">
        {dummyArr.map((_ , idx) => (
            <div key={idx}>
                <Star classname={`w-4 ${rating > idx+1 ? "bg-amber-300" : "bg-gray-600"}`}/>
            </div>
        ))}
    </div>
  )
}
