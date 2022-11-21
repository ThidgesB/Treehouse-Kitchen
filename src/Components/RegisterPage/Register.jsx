import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeferredValue } from "react";

//Regular expressions for defining username and pwd patterns
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    //user input, allow us to set the focus on user input when component loads
    const userRef = useRef();
    //Error reference, if we get an error we need to put the focus on that so it can be announced by a screen reader for accessibility
    const errRef = useRef();

    // User state, tied to user input
    const [user, setUser] = useState("");
    //boolean tied to whether the name validates or not
    const [validName, setValidName] = useState(false);

    //whether we have focus on the input field or not
    const [userFocus, setUserFocus] = useState(false);

    //same purposes as above, for pwd and matching pwd fields
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    //state for possible error msg or successful submission of register form
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //useEffect hook for setting the focus when component loads
    useEffect(() => {
        userRef.current.focus();
    }, []);

    //applied to username, validates username, user state is in dependancy array, anytime it changes it will check the validation of the field, defined with result to show result to console
    //
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user)
        setValidName(result);
    }, [user]);

    //useEffect for pwd, have result, testing against pwd regex, pwd state in dependancy array, confirmation is defined with match, comparing pwd to the match pwd state
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(user, pwd);
        setSuccess(true);
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    //this function will provide the event and then set the user state, ties input to user state
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    //Let's us provide another element that describes the input field, screen reader will read label first and what type of input we're addressing, and if the input is valid.
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user &&
                !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a special character. <br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span> 
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Sign Up!
                </button>
            </form>
            <p>
                Already Registered?<br />
                <span className="line">
                    <a href="#">Sign In</a>
                </span>
            </p>
        </section>
    )



}

export default Register