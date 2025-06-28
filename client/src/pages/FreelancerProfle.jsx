import PublicLayout from "../layout/PublicLayout.jsx";

const Homepage = () => {


    return (
        <PublicLayout>
            <div className="">
                <div className="accountInformationContainer px-24">
                    <div className="mt-6 profileButtonContainer grid grid-cols-2 w-3/12">
                        <button className="h-14 w-full flex flex-row items-center bg-bgColor2 text-subHeadingText rounded-md text-p pl-8"><i class="fa-solid fa-clock-rotate-left pr-4"></i> Feedback History</button>
                        <button className="h-14 w-full items-center bg-headingText text-white rounded-md"><i class="fa-solid fa-user pr-4"></i> Profile</button>
                    </div>

                    <form className="mb-14" action="">
                        <h2 className="text-h2 text-headingText font-bold mt-16">Account Information</h2>
                        <div className="formContainer grid grid-cols-2 gap-14 mt-6">
                            <div className="firstNameContainer">
                                <label htmlFor="firstName">First Name: <span className="text-red">*</span></label><br />
                                <input type="text" name="firstName" id="firstName" className="firstName bg-bgColor2 rounded-md w-full h-14" />
                            </div>

                            <div className="resumeNameContainer">
                                <label htmlFor="resumeName">Resume Name: </label><br />
                                <input type="text" name="resumeName" id="resumeName" className="resumeName bg-bgColor2 rounded-md w-full h-14" />
                            </div>

                            <div className="surnameContainer">
                                <label htmlFor="surName">Last Name: <span className="text-red">*</span></label><br />
                                <input type="text" name="surName" id="surName" className="surName bg-bgColor2 rounded-md w-full h-14" />
                            </div>
                            
                            <div className="empty">
                                <p className="text-h5">Preview:</p>
                            </div>
                            
                            <div className="jobPositionContainer">
                                <label htmlFor="jobPosition">Job Position: <span className="text-red">*</span></label><br />
                                <input type="text" name="jobPosition" id="jobPosition" className="jobPosition bg-bgColor2 rounded-md w-full h-14" />
                            </div>  
                            
                            <div className="resumeImageContainer">
                                <img className="max-h-[90%]" src="../src/assets/sampleresume.png" alt="not working" />
                            </div>
                        </div>

                        <div className="w-12/12 grid grid-cols-2 formButtonsContainer p-16">
                            <input className="text-white text-h6 bg-primary p-1 w-11/12 rounded-3xl" type="button" value="Edit" />
                            <input className="text-white text-h6 bg-[#4F5D75] p-1 w-11/12 rounded-3xl" type="submit" value="Save Changes" />
                        </div>
                    </form>
                </div>
                <div className="changePasswordContainer bg-bgColor2 px-24 py-10 mb-10">
                    <p className="text-h3 text-headingText font-bold mb-10" >Change Password</p>
                    <form action="">
                        <div className="changePasswordFormContainer grid grid-cols-2 gap-10">
                            <div className="currentPasswordContainerg col-span-2">
                                <label htmlFor="currentPassword">Current Password: <span className="text-red">*</span></label> <br />
                                <input className="currentPassword w-full h-8 bg-bgColor2 border-b-[1px] border-b-slate-950" type="password" name="currentPassword" id="currentPassword"  placeholder="Enter your current password" />
                            </div>
                            <div className="newPasswordContainer">
                                <label htmlFor="newPassword">New Password: <span className="text-red">*</span> </label><br />
                                <input className="newPassword w-full h-8 bg-bgColor2 border-b-[1px] border-b-slate-950" type="password" name="newPassword" id="newPassword" placeholder="Enter your New password"/>
                            </div>
                            <div className="confirmNewPasswordContainer">
                                <label htmlFor="confirmPassword">Confirm New Password: <span className="text-red">*</span></label><br />
                                <input className="confirmPassword w-full h-8 bg-bgColor2 border-b-[1px] border-b-slate-950" type="password" name="confirmPassword" id="confirmPassword" placeholder="Enter your New password again"/>
                            </div>
                        </div>
                        <div className="changePasswordButtonsContainer w-12/12 grid grid-cols-2 formButtonsContainer p-16">
                            <input className="text-white text-h6 bg-primary p-1 w-11/12 rounded-3xl" type="button" value="Edit" />
                            <input className="text-white text-h6 bg-[#4F5D75] p-1 w-11/12 rounded-3xl" type="submit" value="Save Changes" />
                        </div>
                    </form>
                </div>
            </div>
        </PublicLayout>
    )
}

export default Homepage;