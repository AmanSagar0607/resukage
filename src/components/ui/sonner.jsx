import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster] bg-background text-foreground font-bold  text-md" , // Updated border to primary
          description: "group-[.toast] text-muted-foreground",
          actionButton: "group-[.toast] bg-primary text-primary-foreground",
          cancelButton: "group-[.toast] bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
