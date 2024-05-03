import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"


type Inputs = {
  method: string;
  url: string;
  body: any;
  headers: any;
  auth: any;
  example: string;
  exampleRequired: string
}

type ResponseData = {
  status: number;
  size: string;
  time: string;
  response: any;
  headers: {};
  cookies: any;
}

type RequestHeader = {
  [key: string]: string
}

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [responseData, setResponseData] = useState<ResponseData>();
  const [requestHeaders, setRequestHeaders] = useState<Array<RequestHeader>>([]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const res = await fetch(data.url, {
      method: data.method,
      mode: 'cors',
      headers: data.headers,
      body: data.body
    })

    const responseData = await res.json()

    setResponseData(responseData)


    console.log({ res: await res.json() })
  }

  const addHeader = () => setRequestHeaders(headers => ([...headers, {}]))

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="http://localhost:3000" {...register("url")} />
        <select {...register(`method`, { required: true })}>
          <option value="GET">GET</option>
          <option value="PUT">PUT</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
        </select>

        <details>
          <summary>Body</summary>
          <textarea {...register("body")} rows={15} />
        </details>

        <details>
          <summary>Headers</summary>
          {
            requestHeaders.map(h => {
              return <>
                <select>
                  <option value="Content-Type">Content-Type</option>
                </select>
                <input defaultValue="" {...register(`headers.{h}`)} />
              </>
            })}
          <button type="button" onClick={addHeader}>Add header</button>
        </details>
        <input type="submit" />
      </form>
      <pre>
        {JSON.stringify(responseData)}
      </pre>
    </>
  )
}

/* {errors.exampleRequired && <span>This field is required</span>} */
export default App
