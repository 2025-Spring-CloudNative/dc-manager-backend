ALTER TABLE "ip_address" ALTER COLUMN "address" SET DATA TYPE inet;--> statement-breakpoint
ALTER TABLE "subnet" ALTER COLUMN "cidr" SET DATA TYPE cidr;--> statement-breakpoint
ALTER TABLE "subnet" ALTER COLUMN "netmask" SET DATA TYPE inet;--> statement-breakpoint
ALTER TABLE "subnet" ALTER COLUMN "gateway" SET DATA TYPE inet;--> statement-breakpoint
ALTER TABLE "ip_pool" ADD COLUMN "cidr" "cidr" NOT NULL;--> statement-breakpoint
ALTER TABLE "ip_pool" DROP COLUMN "start_ip";--> statement-breakpoint
ALTER TABLE "ip_pool" DROP COLUMN "end_ip";