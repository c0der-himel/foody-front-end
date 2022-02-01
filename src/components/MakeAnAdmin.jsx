import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const MakeAnAdmin = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { token } = useAuth();

  const onSubmit = (data) => {
    axios({
      method: 'put',
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: 'https://powerful-retreat-84363.herokuapp.com/users/admin',
      data: {
        email: data.email,
      },
    })
      .then((response) => {
        if (response.data.modifiedCount) {
          reset();
          toast.success(`${data.email} has become an Admin`, {
            position: 'bottom-left',
            autoClose: 3000,
          });
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(`${error.message}`, {
          position: 'bottom-left',
          autoClose: 3000,
        });
      });
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-gray-600">
            Make Admin
          </h1>
          <div className="h-1 w-24 bg-orange-600 mx-auto rounded-full"></div>
        </div>
        <div className="lg:w-full md:w-full mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -m-2"
          >
            <div className="p-2 w-1/2 mx-auto">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600 ml-3"
                >
                  Email
                </label>
                <input
                  {...register('email', {
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    required: true,
                  })}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-amber-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {(errors.email?.type === 'required' && (
                  <div className="p-1.5 mt-5 bg-rose-500 text-white text-center rounded-full font-bold">
                    Email is required
                  </div>
                )) ||
                  (errors.email?.type === 'pattern' && (
                    <div className="p-1.5 mt-5 bg-rose-500 text-white text-center rounded-full font-bold">
                      Invalid email address
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-2 w-full mt-5">
              <button
                type="submit"
                className="flex mx-auto text-center bg-orange-600 border border-transparent rounded-full py-3 px-9 font-bold text-white hover:bg-orange-700 transition duration-300"
              >
                Make Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MakeAnAdmin;
