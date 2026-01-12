const TaglineSection = () => {
  return (
    <div className="bg-headingText min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[384px] flex justify-center items-center gap-6 sm:gap-8 md:gap-10 flex-col border-2 border-gray-300 rounded-lg px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 max-w-4xl">
        <p className="text-bgColor2  text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight sm:leading-tight md:leading-tight lg:leading-relaxed">
          <span className="text-primary">Practice. Improve. Succeed.</span> Your
          Interview Journey Starts Here.
        </p>
      </div>
    </div>
  );
};
export default TaglineSection;
