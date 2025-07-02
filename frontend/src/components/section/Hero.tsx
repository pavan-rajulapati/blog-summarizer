import { useState } from "react";
import Button from "../shared/Button";
import Container from "../shared/Container";
import { BsStars } from "react-icons/bs";
import Result from "./Result";

const Hero = () => {
    const [query, setQuery] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setSummary("");

        try {
            const response = await fetch("https://sumrize.onrender.com/api/summarize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: query }),
            });

            const data = await response.json();

            if (data?.summary_text) {
                setSummary(data.summary_text);
            } else {
                setSummary("No summary could be generated.");
            }

        } catch (error) {
            console.error("Summary generation failed:", error);
            setSummary("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="w-full flex justify-center text-black md:px-24">
            <Container>
                <div className="w-62 h-auto absolute right-23 top-20 md:top-0 blur-lg md:blur-sm z-0 rounded-full">
                    <img src="assets/Adobe Express - file (8).png"
                     className="object-cover"
                     alt="Vector Image 1" />    
                </div>
                <div className="w-62 h-auto absolute left-23 bottom-0 blur-lg md:blur-sm z-0 rounded-full">
                    <img src="assets/Adobe Express - file (9).png"
                     className="object-cover"
                     alt="Vector Image 2" />
                </div>

                <div className="w-full flex flex-col items-center">
                    <div className="flex flex-col items-center z-10">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold font-stardom tracking-wider">
                            AI-Powered{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to to-blue-600">
                                BLOG
                            </span>{" "}
                            Summarizer
                        </h1>
                        <p className="mt-4 text-center text-gray-500 md:text-left md:text-lg">
                            Paste any article or paragraph here and generate a short AI summary instantly!
                        </p>
                    </div>

                    <div className="w-full lg:w-3xl mt-12 flex justify-center relative overscroll-none">
                        <textarea
                            required
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Paste article content here..."
                            className="w-full h-30 p-4 border border-gray-300 rounded-3xl resize-none focus:border-blue-400 backdrop-blur-md bg-white/10 focus:outline-none"
                        />

                        <Button
                            onClick={handleSubmit}
                            className={`absolute border-none bottom-3 right-5 flex items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? (
                                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2" />
                            ) : (
                                <>
                                    Generate
                                    <span className="ml-2 bg-white p-1.5 text-black rounded-full">
                                        <BsStars />
                                    </span>
                                </>
                            )}
                        </Button>
                    </div>

                    <Result content={summary} title="Summarized Text :"></Result>
                </div>
            </Container>
        </section>
    );
};

export default Hero;
