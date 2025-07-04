import PublicLayout from "../layout/PublicLayout.jsx";

const EntrepreneurProfile = () => {
  return (
    <PublicLayout>
      <div className="">
        <div className="accountInformationContainer px-24">
          <div className="mt-6 profileButtonContainer grid grid-cols-2 w-3/12">
            <button className="h-14 w-full items-center border-2 border-headingText rounded-md text-p pl-8">
              <i className="fa-solid fa-clock-rotate-left pr-4"></i> Feedback
              History
            </button>
            <button className="h-14 w-full items-center bg-headingText text-white rounded-md">
              <i className="fa-solid fa-user pr-4"></i> Profile
            </button>
          </div>

          <form className="mb-14" action="">
            <h2 className="text-h2 text-headingText font-bold mt-16">
              Account Information
            </h2>
            <div className="formContainer grid grid-cols-2 gap-14 mt-6">
              <div className="container1">
                <div className="firstNameContainer mb-14">
                  <label htmlFor="firstName">
                    First Name: <span className="text-red">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="firstName bg-bgColor2 rounded-md w-full h-14"
                  />
                </div>

                <div className="surnameContainer mb-14">
                  <label className="text-subHeadingText" htmlFor="surName">
                    Last Name: <span className="text-red">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="surName"
                    id="surName"
                    className="surName bg-bgColor2 rounded-md w-full h-14"
                  />
                </div>

                <div className="businessTypeContainer mb-14">
                  <label htmlFor="businessType">
                    Buisiness Type: <span className="text-red">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="businessType"
                    id="businessType"
                    className="businessType bg-bgColor2 rounded-md w-full h-14"
                  />
                </div>

                <div className="experienceRunningBusinessContainer mb-14">
                  <label htmlFor="experienceRunningBusiness">
                    Experience Running Business:{" "}
                    <span className="text-red">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="experienceRunningBusiness"
                    id="experienceRunningBusiness"
                    className="experienceRunningBusiness bg-bgColor2 rounded-md w-full h-14"
                  />
                </div>

                <div className="productsServicesContainer mb-14">
                  <label htmlFor="productsServices">
                    Products/Services: <span className="text-red">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="productsServices"
                    id="productsServices"
                    className="productsServices bg-bgColor2 rounded-md w-full h-14"
                  />
                </div>
              </div>

              <div className="container2">
                <div className="buisinessDeckContainer mb-8">
                  <label htmlFor="buisinessDeck">Buisiness Deck: </label>
                  <br />
                  <input
                    type="text"
                    name="buisinessDeck"
                    id="buisinessDeck"
                    className="buisinessDeck bg-bgColor2 rounded-md w-full h-14"
                  />
                </div>

                <div className="resumeImageContainer">
                  <img
                    className="max-h-[90%]"
                    src="../src/assets/sampleresume.png"
                    alt="not working"
                  />
                </div>
              </div>
            </div>

            <div className="w-12/12 grid grid-cols-2 formButtonsContainer p-16">
              <input
                className="text-white text-h6 bg-primary p-1 w-11/12 rounded-3xl"
                type="button"
                value="Edit"
              />
              <input
                className="text-white text-h6 bg-[#4F5D75] p-1 w-11/12 rounded-3xl"
                type="submit"
                value="Save Changes"
              />
            </div>
          </form>
        </div>
        <div className="changePasswordContainer bg-bgColor2 px-24 py-10 mb-10">
          <p className="text-h3 text-headingText font-bold mb-10">
            Change Password
          </p>
          <form action="">
            <div className="changePasswordFormContainer grid grid-cols-2 gap-10">
              <div className="currentPasswordContainerg col-span-2">
                <label htmlFor="currentPassword">
                  Current Password: <span className="text-red">*</span>
                </label>{" "}
                <br />
                <input
                  className="currentPassword w-full h-8 bg-bgColor2 border-b-[1px] border-b-slate-950"
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Enter your current password"
                />
              </div>
              <div className="newPasswordContainer">
                <label htmlFor="newPassword">
                  New Password: <span className="text-red">*</span>{" "}
                </label>
                <br />
                <input
                  className="newPassword w-full h-8 bg-bgColor2 border-b-[1px] border-b-slate-950"
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter your New password"
                />
              </div>
              <div className="confirmNewPasswordContainer">
                <label htmlFor="confirmPassword">
                  Confirm New Password: <span className="text-red">*</span>
                </label>
                <br />
                <input
                  className="confirmPassword w-full h-8 bg-bgColor2 border-b-[1px] border-b-slate-950"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Enter your New password again"
                />
              </div>
            </div>
            <div className="changePasswordButtonsContainer w-12/12 grid grid-cols-2 formButtonsContainer p-16">
              <input
                className="text-white text-h6 bg-primary p-1 w-11/12 rounded-3xl"
                type="button"
                value="Edit"
              />
              <input
                className="text-white text-h6 bg-[#4F5D75] p-1 w-11/12 rounded-3xl"
                type="submit"
                value="Save Changes"
              />
            </div>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

export default EntrepreneurProfile;
