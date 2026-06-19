import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const body = await request.json();
    const { fullName, email, cellphone, message } = body;
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["delivered@resend.dev"],
            subject: `Portfolio: nuovo messaggio da ${fullName}`,
            react: EmailTemplate({ fullName, email, cellphone, message }),
        });

        if (error) {
            console.error("Resend error:", error);
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error("Catch error:", error)
        return Response.json({ error }, { status: 500 });
    }
}
