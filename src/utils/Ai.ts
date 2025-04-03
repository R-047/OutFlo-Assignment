import { chat } from "../helpers/GeminiClient";
import { ILead } from "../models/Lead";

export default class AI {
    static async generatePersonalizedMessage(
        campaignName: string,
        campaignDesc: string,
        leadName: string,
        jobTitle: string,
        location: string,
        company: string,
        summary: string
    ): Promise<string | null | never | undefined> {
        const prompt = `you are a sales development representative at outflo, generate a short simple personalized message for the provided linkedin profile to pitch them our sales automation tool outflo, the message should tailored to a campaign called ${campaignName}, this campaign is for ${campaignDesc}, Here is the profile name: ${leadName}, job_title: ${jobTitle}, location: ${location}, company: ${company}, summary: ${summary}`
        const reply = (await chat(prompt)) as any
        return reply.candidates[0].content.parts[0]
    }
}
