import { IErrorDTO } from 'libs/src/dtos'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from 'web/src/common/components/Typography'

const ErrorPage: FC<IErrorDTO> = (props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center gap-3 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Typography className="text-3xl w-max font-bold">
        {props.message}
      </Typography>
      <button
        onClick={() => navigate('/')}
        className="border-2 border-blue-400 text-white bg-blue-400 rounded-lg p-2"
      >
        <Typography className="font-bold">กลับหน้าแรก</Typography>
      </button>
    </div>
  )
}

export default ErrorPage
