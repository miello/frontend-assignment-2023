import { FormEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from 'web/src/common/components/Typography'

const LandingPage = () => {
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      const formData = new FormData(ev.currentTarget)

      const id = formData.get('id')!.toString()
      navigate(id)
    },
    [navigate]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-5 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Typography className="text-5xl text-blue-500">สั่งอะไรดี</Typography>
      <div className="flex gap-5">
        <input
          type="text"
          name="id"
          required
          className="border-2 border-black rounded-xl pl-2 pr-2 pt-1 pb-1"
          placeholder="เลข ID ของร้าน"
        />
        <button type="submit" className="bg-blue-400 text-white rounded-xl p-2">
          <Typography className="font-bold">ค้นหา</Typography>
        </button>
      </div>
    </form>
  )
}

export default LandingPage
