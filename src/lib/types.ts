export interface Task {
	id: string;
	user_id: string;
	title: string;
	status: "todo" | "in_progress" | "completed";
	priority?: "low" | "medium" | "high";
	due_date?: string;
	created_at: string;
	updated_at: string;
}
