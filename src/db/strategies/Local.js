import { Strategy as LocalStrategy } from "passport-local";
import { passwordMatch } from "../../lib/passwordUtils.js";
import { findOneUserQuery } from "../../queries/users.js";

const customFields = {
    usernameField: "email",
    passwordField: "password",
};
const verifyCallback = async (email, password, done) => {
    try {
        const user = await findOneUserQuery(
            { email },
            [],
            ["passwordSalt", "passwordHash"]
        );

        if (!user) {
            return done(null, false, {
                message: "Incorrect email or password.",
            });
        }

        const isValid = passwordMatch(
            password,
            user.passwordHash,
            user.passwordSalt
        );

        if (!isValid) {
            return done(null, false, {
                message: "Incorrect email or password.",
            });
        }

        return done(null, user);
    } catch (error) {
        done(error);
    }
};
export const localStrategy = new LocalStrategy(customFields, verifyCallback);
