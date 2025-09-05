import {useState} from "react";
import Spinner from "./components/Spinner.jsx";
import { addQuotes, getQuotes } from "./appwrite.js";




const App = () => {

    const [quoteResponse, setQuoteResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitQuote, setSubmitQuote] = useState('');
    const [submitResponse, setSubmitResponse] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false)
    var errorMessage = "Error fetching quotes. Try again later!";


    const loadQuotes = async () => {
        setIsLoading(true);

        try {
            const response = await getQuotes();
            let randomQuote;

            if (response.length === 1) {
                randomQuote = response[0];
            } else {
                do {
                    let randomIndex = Math.floor(Math.random() * response.length);
                    randomQuote = `"${response[randomIndex]}"`;

                } while (randomQuote === quoteResponse);
            }
            
            setQuoteResponse(randomQuote);
            
        } catch (error) {
            console.error(error);
            setQuoteResponse(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const addingQuote = async () => {
        setSubmitLoading(true);
        try {
            if (submitQuote.length > 20) {
                const response = await addQuotes(submitQuote);
                setSubmitResponse(response);
            }
            else {
                setSubmitResponse('Quote has less than 20 characters!');
            }
        }
        catch (error) {
            console.log(error);

        } finally {
            setSubmitLoading(false);
        }

    }





    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                 <header>

                     <h1>Welcome to <span className="text-gradient">LeQuote</span> Get a quote NOW!</h1>
                 </header>

                <section className="quote flex justify-center">

                    <button type="button"
                            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 active:scale-95"
                            onClick={() => loadQuotes()}>
                        Generate a Quote
                    </button>

                </section>

                <section className="wrapper genedQuote">
                    {isLoading ? (
                        <Spinner/>
                    ) : quoteResponse === errorMessage ? (
                        <h2 className="text-red-500">{quoteResponse}</h2>
                    ) : (
                        <h2>{quoteResponse}</h2>
                    )}

                </section>

                <section className="ownQuote">
                    <section className="enterQuote">
                        <input
                            type="text"
                            placeholder="Even better, Enter a quote of your OWN!"
                            value={submitQuote}
                            onChange={(e) => setSubmitQuote(e.target.value)}
                        />
                    </section>

                    <section className="quote flex justify-center">
                        <button type="button"
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 active:scale-95"
                                onClick={() => addingQuote()}>
                            Submit Quote
                        </button>
                    </section>

                    <section className="wrapper genedQuote">

                        {submitLoading ? (
                            <Spinner/>
                        ) : submitResponse !== "Quote created successfully." ? (
                            <h2 className="text-red-500">{submitResponse}</h2>
                        ) : (
                            <h2 className="text-green-500">{submitResponse}</h2>
                        )}

                    </section>
                </section>



            </div>
        </main>
    )
}

export default App;
