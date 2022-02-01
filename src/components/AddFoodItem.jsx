import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddFoodItem = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [img, setImg] = useState(null);
  const formData = new FormData();

  const onSubmit = (data) => {
    data.img = img;

    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('category', data.catName);
    formData.append('star', 5);
    formData.append('reviews', 777);
    formData.append('img', data.img);

    fetch('https://powerful-retreat-84363.herokuapp.com/menu', {
      method: 'post',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success(`Food item added.`, {
            position: 'bottom-left',
            autoClose: 3000,
          });
          reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-gray-600">
            Add Food Item
          </h1>
          <div className="h-1 w-24 bg-orange-600 mx-auto rounded-full"></div>
        </div>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 mx-auto accent-orange-600"
        >
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600 ml-3"
                >
                  Name
                </label>
                <input
                  {...register('name', {
                    required: true,
                    maxLength: 20,
                    minLength: 3,
                  })}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-amber-200 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-300 ease-in-out"
                />
                {(errors.name?.type === 'required' && (
                  <div className="p-1.5 mt-5 bg-rose-500 text-white text-center rounded-full font-bold">
                    Food Name is required
                  </div>
                )) ||
                  (errors.name?.type === 'minLength' && (
                    <div className="p-1.5 mt-5 bg-rose-500 text-white text-center rounded-full font-bold">
                      Food Name must be 4 characters long
                    </div>
                  )) ||
                  (errors.name?.type === 'maxLength' && (
                    <div className="p-1.5 mt-5 bg-rose-500 text-white text-center rounded-full font-bold">
                      Food Name must be less than 20 characters
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="price"
                  className="leading-7 text-sm text-gray-600 ml-3"
                >
                  Price
                </label>
                <input
                  {...register('price', {
                    required: true,
                  })}
                  type="number"
                  id="price"
                  name="price"
                  className="w-full bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-amber-200 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-300 ease-in-out"
                />
                {errors.price?.type === 'required' && (
                  <div className="p-1.5 mt-5 bg-rose-500 text-white text-center rounded-full font-bold">
                    Price is required
                  </div>
                )}
              </div>
            </div>
            <div className="p-2 w-full mt-2">
              <div className="relative flex items-center">
                <label
                  htmlFor="catName"
                  className="leading-7 text-sm text-gray-600 ml-3 mr-2"
                >
                  Pure Veg
                </label>
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-orange-600 checked:border-orange-600 focus:outline-none transition duration-300 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="catName"
                  id="catName"
                  value="pure-veg"
                  {...register('catName', {
                    required: true,
                  })}
                />
                {errors.catName?.type === 'required' && (
                  <div className="p-1.5 bg-rose-500 text-white text-center rounded-full font-bold">
                    Category is required
                  </div>
                )}
                <label
                  htmlFor="catName"
                  className="leading-7 text-sm text-gray-600 ml-3 mr-2"
                >
                  Non Veg
                </label>
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-orange-600 checked:border-orange-600 focus:outline-none transition duration-300 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="catName"
                  id="catName"
                  value="non-veg"
                  {...register('catName', {
                    required: true,
                  })}
                />
                {errors.catName?.type === 'required' && (
                  <div className="p-1.5 bg-rose-500 text-white text-center rounded-full font-bold">
                    Category is required
                  </div>
                )}
              </div>
            </div>
            <div className="p-2 w-full mt-2">
              <div className="relative flex items-center">
                <label
                  htmlFor="imgUpload"
                  className="leading-7 text-sm text-gray-600 ml-3"
                >
                  Upload Image
                </label>
                <input
                  className="w-full bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-amber-200 text-base outline-none text-gray-600 px-3 leading-8 transition-colors duration-300 ease-in-out file:bg-orange-600 file:text-white file:border-none hover:file:bg-orange-700 file:font-bold file:rounded-full file:px-6 file:py-1.5 file:-ml-3 file:mr-5 file:cursor-pointer file:duration-300 file:transition"
                  type="file"
                  name="imgUpload"
                  id="imgUpload"
                  {...register('imgUpload', {
                    required: true,
                  })}
                  onChange={(e) => setImg(e.target.files[0])}
                />
                {errors.imgUpload?.type === 'required' && (
                  <div className="p-1.5 ml-5 bg-rose-500 text-white text-center rounded-full font-bold">
                    Image is required
                  </div>
                )}
              </div>
            </div>
            <div className="p-2 w-full mt-5">
              <button
                type="submit"
                className="flex mx-auto text-center bg-orange-600 border border-transparent rounded-full py-3 px-9 font-bold text-white hover:bg-orange-700 transition duration-300"
              >
                Button
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddFoodItem;
