ALTER TABLE "refresh_token" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;