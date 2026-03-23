import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function createUser() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) return;

  await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: {
      clerkId: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: clerkUser.fullName || "",
      imageUrl: clerkUser.imageUrl || "",
    },
  });
}
