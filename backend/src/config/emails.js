import { mailtrapClient, sender } from "./mailtrap.js";
import { VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient =  [{email}];

    try {
        const response = await mailtrapClient.send({
            to: recipient,
            from: sender,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Verification email sent:", response);
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};

