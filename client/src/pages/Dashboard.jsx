import PublicLayout from "../layout/PublicLayout.jsx";

const skills = [
    { name: 'Communication', score: 80 },
    { name: 'Critical Thinking', score: 78 },
    { name: 'Adaptability', score: 72 },
    { name: 'Problem Solving', score: 88 },
  ];


const Dashboard = () => {


    return (
        <PublicLayout>
            <div className="flex flex-col justify-center items-center p-10">
                <h3 className="font-bold text-headingText text-h3">Welcome Back, Onick!</h3>
                <p className="text-p text-subHeadingText">Ready to ace your next interview? Let's continue improving your skills</p>
                <div className="container1 grid grid-cols-3 gap-10 mt-10 w-full">
                    <div className="startInterviewContainer flex flex-col justify-center items-center bg-primary bg-opacity-[.13] p-10 rounded-2xl border-primary border-[1.5px]">
                        <p className="text-primary text-h4 font-bold">Start Interview</p>
                        <p className="text-small">Practice with AI-powered mock interviews</p>
                        <button className="bg-primary text-white p-1 px-14 text-h6 rounded-3xl mt-3"><i class="fa-solid fa-circle-play"></i> Begin Interview</button>
                    </div>

                    <div className="quickOverviewContainer col-span-2 bg-bgColor2 p-5 px-8 rounded-2xl">
                        <div className="top relative flex">
                            <p className="font-bold text-h5 text-headingText">Quick Overview</p>
                            <p className="bg-primary bg-opacity-[.13] rounded-2xl border-primary border-[1.5px] text-[12px] items-center flex absolute right-0 top-2 p-[4px]">120 credits</p>
                        </div>
                        <div className="content">
                            <div className="overviewDataContainer grid grid-cols-4 gap-10">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-h5 text-headingText font-bold">23</p>
                                    <p>Total Session</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-h5 font-bold text-green">84%</p>
                                    <p>Avg Score</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-h5 font-bold text-primary">12H</p>
                                    <p>Practice Time</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-h5 font-bold">7</p>
                                    <p className="">Skills Improved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container2 grid grid-cols-2 gap-10 w-full mt-10">
                    <div className="recentSessionContainer bg-bgColor2 p-10 py-5 rounded-xl">
                        <p className="text-h5 text-headingText font-bold"><i class="fa-regular fa-clock pr-2"></i> Recent Sessions</p>
                        <div className="behavioralInterview  bg-bgColor rounded-2xl p-4 mb-4 mt-4 border-primary border-[1.5px] flex">
                            <div className="container relative">
                                <p className="text-h6 font-bold">Behavioral Interview</p>
                                <p className="text-small">2025-06-24</p>
                            </div>
                            <p className="text-p bg-green bg-opacity-[.28] border-green border-[1px] rounded-full w-16 h-16 flex items-center justify-center">80%</p>
                        </div>
                        <div className="behavioralInterview  bg-bgColor rounded-2xl p-4 mb-4 border-primary border-[1.5px] flex">
                            <div className="container relative">
                                <p className="text-h6 font-bold">Behavioral Interview</p>
                                <p className="text-small">2025-06-24</p>
                            </div>
                            <p className="text-p bg-red bg-opacity-[.28] border-red border-[1px] rounded-full w-16 h-16 flex items-center justify-center">30%</p>
                        </div>
                        <div className="behavioralInterview  bg-bgColor rounded-2xl p-4 mb-4 border-primary border-[1.5px] flex">
                            <div className="container relative">
                                <p className="text-h6 font-bold">Behavioral Interview</p>
                                <p className="text-small">2025-06-24</p>
                            </div>
                            <p className="text-p bg-green bg-opacity-[.28] border-green border-[1px] rounded-full w-16 h-16 flex items-center justify-center">80%</p>
                        </div>
                    </div>

                    <div className="softSkillsSummaryContainer bg-bgColor2 rounded-xl p-10 py-5">
                        <p className="text-h5 text-headingText font-bold"><i class="fa-regular fa-clock pr-2"></i> Soft Skills Summary</p>
                        <div className="">
                            <div className="space-y-3">
                            {skills.map((skill) => (
                                <div key={skill.name}>
                                <div className="flex justify-between text-p my-4">
                                    <span className="text-gray-600">{skill.name}</span>
                                    <span className="text-gray-600">{skill.score}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                    className="bg-blue-600 h-4 rounded-full"
                                    style={{ width: `${skill.score}%`}}
                                    ></div>
                                </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container3 p-10 py-5 bg-bgColor2 rounded-xl mt-10 w-full">
                    <p className="text-h4 text-headingText font-bold"> <i class="fa-solid fa-triangle-exclamation text-brown text-h3"></i> Areas of Improvement</p>
                    <div className="areasOfImprovementContainer grid grid-cols-3 gap-10 mt-10">
                        <div className="cardContainer1 bg-brown bg-opacity-[.28] border-brown border-[1.5px] rounded-xl p-4 pb-8">
                            <p className="text-p">Tendency to speak too quickly during technical explanations</p>
                        </div>
                        <div className="cardContainer2 bg-brown bg-opacity-[.28] border-brown border-[1.5px] rounded-xl p-4 pb-8">
                            <p className="text-p">Sometimes Provides overdetailed questions</p>
                        </div>
                        <div className="cardContainer3 bg-brown bg-opacity-[.28] border-brown border-[1.5px] rounded-xl p-4 pb-8">
                            <p className="text-p">Could improve eye contact consistency</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}

export default Dashboard;