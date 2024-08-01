import Swal from 'sweetalert2'

function App() {

  let accessKey = import.meta.env.VITE_FORM_ACCESS_KEY

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", accessKey);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      // console.log("Success", res);
      Swal.fire({
        title: res.data.name,
        text: "Message sent successfully!",
        icon: "success"
      });
      event.target.reset()
    }
    else{
      Swal.fire({
        title: "Cancelled",
        text: res.message,
        icon: "error"
      });
    }
  };

  return (

    <>
      <div className="form flex items-center justify-center h-screen text-gray-800 bg-gradient-to-r from-violet-500 to-fuchsia-500">

      <form className="sm:w-[25rem] w-11/12 bg-white rounded-lg p-6 flex flex-col gap-4" onSubmit={onSubmit} action="">

        <h1 className="text-2xl text-center font-bold my-3">Contact Form</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Full Name</label>
          {/* placeholder-shown:text-sm */}
          <input type="text" name="name" className="border-[1px] px-2 py-1 border-gray-400 rounded outline-0" required placeholder="Enter your name" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Email Address</label>
          <input type="email" name="email" className="border-[1px] px-2 py-1 border-gray-400 rounded outline-0" required placeholder="Enter your email" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Your Message</label>
          <textarea name="message" rows={3} className="border-[1px] px-2 py-1 border-gray-400 rounded outline-0" required placeholder="Enter your message" id=""></textarea>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 py-2 text-white rounded">Send Message</button>

      </form>
      
      </div>
    </>
  )
}

export default App
