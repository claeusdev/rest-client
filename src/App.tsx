import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Inputs, RequestHeader, ResponseData } from "./types";
import commonHeaders from "./utils";


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

    console.log({ data: data.body })

    const res = await fetch(data.url, {
      method: data.method,
      mode: 'cors',
      headers: data.headers,
      ...(data.method !== "GET" && { body: JSON.parse(data.body) })
    })

    const responseData = await res.json()

    setResponseData(responseData)
  }

  const addHeader = () => setRequestHeaders(headers => ([...headers, {}]))

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <main className="container mx-auto my-4">
      <div className="row justify-content-between">
        <div className="col-md-6" style={{
          maxWidth: "50%"
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label id="url" className="form-label">Url</label>
              <input defaultValue="http://localhost:3000" {...register("url")} className="form-control" />
            </div>
            <div className="mb-3">
              <label id="method" className="form-label">Request Method</label> <br />
              <select {...register(`method`, { required: true })}>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="POST">POST</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            <div className="mb-3">
              <details>
                <summary>Body</summary>
                <textarea {...register("body")} rows={15} className="form-control" />
              </details>
            </div>


            <div className="mb-3">
              <details>
                <summary>Headers</summary>
                {
                  requestHeaders.map(h => {
                    return <div>
                      <select>
                        {commonHeaders.map(header => <option key={header.key} value={header.value}>{header.key}</option>)}
                      </select>
                      <input defaultValue="" {...register(`headers.{h}`)} className="form-control" />
                    </div>
                  })}
                <button type="button" onClick={addHeader}>Add header</button>
              </details>
            </div>
            <input type="submit" className="btn btn-success" />

          </form>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-4">
              <p>Status: {responseData?.status}</p>
            </div>
            <div className="col-md-4">
              <p>Time: {responseData?.time}</p>
            </div>
            <div className="col-md-4">
              <p>Size: {responseData?.size} bytes</p>
            </div>
          </div>
          <pre>
            {JSON.stringify(responseData)}
          </pre>
        </div>

      </div>

    </main>
  )
}

/* {errors.exampleRequired && <span>This field is required</span>} */
export default App
