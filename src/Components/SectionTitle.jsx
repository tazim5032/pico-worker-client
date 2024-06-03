const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-1/3 my-8">
            <p className="text-yellow-600 mb-2">--- {subHeading} ---</p>
            <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>
        </div>
    );
};

export default SectionTitle;