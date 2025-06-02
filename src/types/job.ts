/**
 * Represents a job listing
 * @interface Job
 * @property {string} id - Unique identifier for the job
 * @property {string} title - Job title
 * @property {string} company - Job company
 * @property {string} location - Job location (Remote, Hybrid, or city name)
 * @property {string} category - Job category (e.g., Development, Design, Marketing)
 * @property {string} type - Job type (e.g., Full-time, Part-time, Contract)
 * @property {string} description - Markdown formatted job description
 * @property {string[]} requirements - Array of job requirements
 * @property {string[]} keywords - Array of relevant keywords/skills for the job
 */
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  requirements: string[];
  keywords: string[];
} 