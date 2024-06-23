import { CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import Layout from "@/components/layout"
import { generatePassword } from "@/lib/password"
import { Switch } from "@/components/ui/switch"
import { generateSillyPassword } from 'silly-password-generator';

export default function Generator() {
  const [length, setLenght] = useState([8])
  const [uppercase, setUppercase] = useState<boolean | 'indeterminate'>(true);
  const [lowercase, setLowercase] = useState<boolean | 'indeterminate'>(false)
  const [num, setNum] = useState<boolean | 'indeterminate'>(true)
  const [symbols, setSymbols] = useState<boolean | 'indeterminate'>(true)
  const [generatedPass, setGeneratedPass] = useState("")

  const [funMode, setFunMode] = useState(false)
  const [funCapitalize, setFunCapitalize] = useState<boolean | 'indeterminate'>(false)

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text)
  }

  const generatePasswordWithOptions = () => {
    if (funMode) {
      return setGeneratedPass(generateSillyPassword({ wordCount: length[0], capitalize: funCapitalize as boolean }))
    } else {
      setGeneratedPass(generatePassword(length[0], uppercase as boolean, lowercase as boolean, num as boolean, symbols as boolean))
    }
  }

  return (
    <Layout>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Password Generator</h2>
          <Button onClick={() => generatePasswordWithOptions()}>Generate</Button>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="funmode" checked={funMode} onCheckedChange={(newVal) => setFunMode(newVal)} />
          <Label htmlFor="funmode">Fun mode</Label>
        </div>
        <Card>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 mt-4">
              <Label htmlFor="length">Length</Label>
              <Slider id="length" min={8} max={32} defaultValue={[16]} step={1} onValueChange={(newVal) => setLenght(newVal)} />
            </div>
            <div className="grid gap-2">
              {funMode ? (
                <Label className="flex items-center gap-2">
                  <Checkbox id="include-uppercase" checked={funCapitalize} onCheckedChange={(newVal) => setFunCapitalize(newVal)} />
                  Capitalize
                </Label>
              ) : (
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2">
                    <Checkbox id="include-uppercase" checked={uppercase} onCheckedChange={(newVal) => setUppercase(newVal)} />
                    Include Uppercase
                  </Label>
                  <Label className="flex items-center gap-2">
                    <Checkbox id="include-lowercase" checked={lowercase} onCheckedChange={(newVal) => setLowercase(newVal)} />
                    Include Lowercase
                  </Label>
                  <Label className="flex items-center gap-2">
                    <Checkbox id="include-numbers" checked={num} onCheckedChange={(newVal) => setNum(newVal)} />
                    Include Numbers
                  </Label>
                  <Label className="flex items-center gap-2">
                    <Checkbox id="include-symbols" checked={symbols} onCheckedChange={(newVal) => setSymbols(newVal)} />
                    Include Symbols
                  </Label>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Generated Password</Label>
              <div className="flex items-center gap-2">
                <Input id="password" readOnly value={generatedPass} />
                <Button onClick={() => copyToClipboard(generatedPass)} variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
