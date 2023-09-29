import { Tabs } from "../components/atoms";

export default function Example1() {
  return <div className="flex flex-col gap-6">
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Example page!</h2>

    <div>
    <Tabs.Root defaultValue="overview">
      <Tabs.TabsList>
        <Tabs.TabsTrigger value="overview">Overview</Tabs.TabsTrigger>
        <Tabs.TabsTrigger value="tasks">Tasks</Tabs.TabsTrigger>

      </Tabs.TabsList>

      <Tabs.TabsContent value="overview">
        TODO: Content 1
      </Tabs.TabsContent>

      <Tabs.TabsContent value="tasks">
        TODO: Content 2
      </Tabs.TabsContent>
    </Tabs.Root>
    </div>
  </div>
}