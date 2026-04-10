CREATE TYPE "public"."language" AS ENUM('javascript', 'typescript', 'python', 'go', 'rust', 'java', 'csharp', 'php', 'html', 'css', 'sql');--> statement-breakpoint
CREATE TYPE "public"."roast_mode" AS ENUM('brutal', 'sarcasm');--> statement-breakpoint
CREATE TABLE "roasts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code_content" text NOT NULL,
	"language" "language" NOT NULL,
	"mode" "roast_mode" NOT NULL,
	"score" numeric(3, 1) NOT NULL,
	"roast_text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
