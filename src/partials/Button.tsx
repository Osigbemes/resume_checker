export const Loader = ({ loadingText }: any) => {
  return (
    <>
      <span>
        <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2" role="status">
          <span className="visually-hidden"></span>
        </div> {loadingText} ...
      </span></>
  )
}
export const Button = ({ loadingText, loading, setLoading, text, active, secondary, rest, onClick, btnType, disabled, btnImage, btnSize }: any) => {
  return (
    <>
      <button onClick={onClick}
        disabled={loading || disabled}
        type="submit"
        className={`${(btnType === "primary") ? ` cursor-pointer w-full bg-blue-900 rounded-xl border border-red-900 py-3 px-10 flex items-center justify-center  font-normal text-white transform transition duration-300  hover:bg-white hover:text-blue-900 hover:border-1 hover:border-blue-900` : ""} ${(btnType === "secondary") ? ` cursor-pointer w-full bg-huzz-green rounded-lg border border-green-100 py-2 px-10 flex items-center justify-center font-normal text-white transform transition duration-300  hover:bg-white hover:text-green-900 hover:border-1 hover:border-green-900` : ""} ${(btnSize === "sm") ? `text-sm` : ""} ${(btnType === "nude") ? `cursor-pointer w-full bg-white rounded-xl border border-white py-3 px-10 flex items-center justify-center font-normal text-white transform transition duration-300  hover:bg-blue-900 hover:text-blue-900 hover:border-1 hover:border-red-800` : ""} ${(btnType === "tertiary") ? `cursor-pointer w-full bg-red-800 rounded-xl border border-red-900 py-3 px-10 flex items-center justify-center font-normal text-white transform transition duration-300  hover:bg-red-900 hover:text-blue-900 hover:border-1 hover:border-red-800` : ""} `} >
        {loading ?
          <Loader loadingText={loadingText} /> :
          <span> {btnImage ? <img
            className=" h-auto w-2/5 ml-2 mr-2 inline "
            src={`${btnImage}`}
            alt="Workflow"
          /> : ""}
            {text}</span>}
      </button>
    </>
  )
}
