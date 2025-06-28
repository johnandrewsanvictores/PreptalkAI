import PublicLayout from "../layout/PublicLayout.jsx";

const FreelanceSetupProfilepage = () => {


    return (
        <PublicLayout>
            <div className="flex flex-col justify-center items-center mt-16">
                <h1 className="text-h1 font-bold text-primary">Setting Up your Profile</h1>
                <p className="text-subHeadingText">Tell us about yourself so we can tailor your AI practice sessions</p>

                <div className="resumeButtonContainer mt-10 flex flex-col justify-center items-center">
                    <p className="text-subHeadingText font-bold">Do you have a resume?</p>
                    <button className="bg-[#4F5D75] text-white p-4 px-10 text-h5 rounded-3xl mt-3">Upload Resume <i class="pl-2 fa-solid fa-arrow-up-from-bracket"></i></button>
                </div>

                <hr className="w-[60%] mt-12 mb-12 border-black" />

                <p className="text-subHeadingText font-bold" >Dont have resume?</p>
                <p className="text-subHeadingText" >Add Information manually</p>

                <form className="w-9/12 flex flex-col items-center" action="">
                    <div className="w-full formContainer grid grid-cols-2 gap-14">
                        <div className="name">
                            <label htmlFor="userName">Name: *</label><br />
                            <input type="text" name="userName" id="userName" className="userName bg-bgColor2 rounded-md w-full h-14" />
                        </div>

                        <div className="surname">
                            <label htmlFor="userSurname">Surname: *</label><br />
                            <input type="text" name="userSurname" id="userSurname" className="userSurname bg-bgColor2 rounded-md w-full h-14" />
                        </div>

                        <div className="jobPosition col-span-2">
                            <label htmlFor="userJobPosition">Job Position: *</label><br />
                            <input type="text" name="userJobPosition" id="userJobPosition" className="userJobPosition w-full bg-bgColor2 rounded-md h-14" />
                        </div>
                    </div>
                    <input className=" bg-primary w-1/4 mt-10 mb-10 p-4 rounded-3xl text-white" type="submit" value="Save Profile"/>
                </form>
            </div>
        </PublicLayout>
    )
}

export default FreelanceSetupProfilepage;