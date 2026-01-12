'use server';
/**
 * @fileOverview An AI agent that generates an interactive diagram of a software system based on a natural language description.
 *
 * - generateInteractiveSystemDiagram - A function that handles the diagram generation process.
 * - InteractiveSystemDiagramInput - The input type for the generateInteractiveSystemDiagram function.
 * - InteractiveSystemDiagramOutput - The return type for the generateInteractiveSystemDiagram function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveSystemDiagramInputSchema = z.object({
  systemDescription: z
    .string()
    .describe("A natural language description of the software system."),
});
export type InteractiveSystemDiagramInput = z.infer<typeof InteractiveSystemDiagramInputSchema>;

const InteractiveSystemDiagramOutputSchema = z.object({
  diagramData: z
    .string()
    .describe("A string representation of the diagram data, e.g., in JSON or SVG format."),
});
export type InteractiveSystemDiagramOutput = z.infer<typeof InteractiveSystemDiagramOutputSchema>;

export async function generateInteractiveSystemDiagram(input: InteractiveSystemDiagramInput): Promise<InteractiveSystemDiagramOutput> {
  return interactiveSystemDiagramFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveSystemDiagramPrompt',
  input: {schema: InteractiveSystemDiagramInputSchema},
  output: {schema: InteractiveSystemDiagramOutputSchema},
  prompt: `You are an expert system architect. You will generate diagram data based on the system description provided by the user.

System Description: {{{systemDescription}}}

Diagram Data:`, // The prompt should return the diagram data
});

const interactiveSystemDiagramFlow = ai.defineFlow(
  {
    name: 'interactiveSystemDiagramFlow',
    inputSchema: InteractiveSystemDiagramInputSchema,
    outputSchema: InteractiveSystemDiagramOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
