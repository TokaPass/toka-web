import SettingsLayout from "@/components/SettingsLayout";
import Layout from "@/components/layout";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export default function Settings() {
  const [isBentoEnabled, setIsBentoEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("bentoGrid");
      if (storedValue) {
        setIsBentoEnabled(storedValue === "true");
      }
    }
  }, []);

  const handleBentoChange = (newVal: any) => {
    setIsBentoEnabled(newVal);
    if (typeof window !== "undefined") {
      localStorage.setItem("bentoGrid", `${newVal}`);
    }
  };

  return (
    <Layout>
      <SettingsLayout>
        <p className="font-semibold text-2xl">Experimental settings</p>
        <p className="text-muted-foreground">Enable or disable experimental settings</p>
        <Separator className="mt-4" />

        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Switch id="bento" checked={isBentoEnabled} onCheckedChange={handleBentoChange} />
            <Label htmlFor="bento">Enable Bento grid</Label>
          </div>
        </div>
      </SettingsLayout>
    </Layout>
  );
}
