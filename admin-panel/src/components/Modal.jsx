import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { updateUser } from "../services/userManagement.service";
import { updateDriver } from "../services/driverManagement.service";
import { toast, ToastContainer } from 'react-toastify';

const CustomModal = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);


  const { register, handleSubmit, setValue, formState: { errors } } = useForm();


  useEffect(()=>{
    setValue('name', user.name);
    setValue('email', user.email);
  },[])

  const onSubmit = async (data) => {
    
    try {
      if(user.role === 'user'){
        const response = await updateUser({
          id: user._id,
          name: data.name,
          email: data.email,
        });

        setOpenModal(false);
        toast.success(response.message)

      }else{
        const response = await updateDriver({
          id: user._id,
          name: data.name,
          email: data.email,
        })

        setOpenModal(false);
        toast.success(response.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Button className="w-28" onClick={() => setOpenModal(true)}>Edit</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update Action</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h1 className="text-lg text-center font-bold">{user.role.toUpperCase()} INFO !!!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
                <div className="name my-2">
                  <input {...register('name')} className="w-full rounded placeholder:text-gray-400 font-bold text-black" type="text" placeholder="User name" />
                </div>
                <div className="email my-2">
                  <input {...register('email')} className="w-full rounded placeholder:text-gray-400 font-bold text-black" type="email" placeholder="User email" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpenModal(false)}
                    type="button"
                    className=" bg-red-500 hover:bg-red-400 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Nah, go back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#3ceb2c] hover:bg-[#7fe466] transition-opacity text-white font-semibold w-full py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default CustomModal;
