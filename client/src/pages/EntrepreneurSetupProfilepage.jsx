import PublicLayout from "../layout/PublicLayout.jsx";

const EntrepreneurSetupProfilepage = () => {


    return (
        <PublicLayout>
            <div className="flex flex-col justify-center items-center mt-">
                <h1 className="text-h1 font-bold mt-40 text-primary">Setting Up your Profile</h1>
                <p className="text-subHeadingText mb-16">Tell us about yourself so we can tailor your AI practice sessions</p>

                <form className="w-9/12 flex flex-col items-center" action="">
                    <div className="w-full formContainer grid grid-cols-2 gap-14">
                        <div className="nameContainer">
                            <label htmlFor="userName">Name: *</label><br />
                            <input type="text" name="userName" id="userName" className="userName bg-bgColor2 rounded-md w-full h-16" />
                        </div>

                        <div className="surnameContainer">
                            <label htmlFor="userSurname">Surname: *</label><br />
                            <input type="text" name="userSurname" id="userSurname" className="userSurname bg-bgColor2 rounded-md w-full h-16" />
                        </div>

                        <div className="businessTypeContainer">
                            <label htmlFor="businessType">Buisiness Type: *</label><br />
                            <input type="text" name="businessType" id="businessType" className="businessType bg-bgColor2 rounded-md w-full h-16" />
                        </div>

                        <div className="experienceRunningBusinessContainer">
                            <label htmlFor="experienceRunningBuisiness">Experience Running Buisiness: *</label><br />
                            <input type="text" name="experienceRunningBuisiness" id="experienceRunningBuisiness" className="experienceRunningBuisiness bg-bgColor2 rounded-md w-full h-16" />
                        </div>

                        <div className="productsServicesContainer col-span-2">
                            <label htmlFor="userJobPosition">Products/Services: *</label><br />
                            <input type="text" name="userJobPosition" id="userJobPosition" className="userJobPosition w-full bg-bgColor2 rounded-md h-16" />
                        </div>
                    </div>
                    <input className=" bg-primary w-1/4 mt-10 mb-10 p-4 rounded-3xl text-white" type="submit" value="Save Profile"/>
                </form>
            </div>
        </PublicLayout>
    )
}

export default EntrepreneurSetupProfilepage;