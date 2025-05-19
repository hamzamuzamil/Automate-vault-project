"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseClient } from "@/lib/supabase/client"
import { TemplatesManager } from "@/components/admin/templates-manager"
import { CategoriesManager } from "@/components/admin/categories-manager"
import { SalesAnalytics } from "@/components/admin/sales-analytics"
import { UsersManager } from "@/components/admin/users-manager"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalTemplates: 0,
    totalUsers: 0,
    totalSales: 0,
    recentSales: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = getSupabaseClient()

      // Get total templates
      const { count: templatesCount } = await supabase.from("templates").select("*", { count: "exact", head: true })

      // Get total users
      const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

      // Get total sales
      const { data: salesData } = await supabase.from("purchases").select("amount")

      const totalSales = salesData?.reduce((sum, purchase) => sum + Number.parseFloat(purchase.amount), 0) || 0

      // Get recent sales (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { data: recentSalesData } = await supabase
        .from("purchases")
        .select("amount")
        .gte("created_at", thirtyDaysAgo.toISOString())

      const recentSales = recentSalesData?.reduce((sum, purchase) => sum + Number.parseFloat(purchase.amount), 0) || 0

      setStats({
        totalTemplates: templatesCount || 0,
        totalUsers: usersCount || 0,
        totalSales,
        recentSales,
      })
    }

    fetchStats()
  }, [])

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your templates, users, and view analytics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-vault-dark border-vault-purple/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Templates</CardTitle>
              <CardDescription>All available templates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalTemplates}</p>
            </CardContent>
          </Card>

          <Card className="bg-vault-dark border-vault-purple/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Users</CardTitle>
              <CardDescription>Registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </CardContent>
          </Card>

          <Card className="bg-vault-dark border-vault-purple/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Sales</CardTitle>
              <CardDescription>All time revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${stats.totalSales.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-vault-dark border-vault-purple/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Sales</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${stats.recentSales.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="bg-vault-dark border border-vault-purple/20 mb-8">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-vault-purple data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-vault-purple data-[state=active]:text-white"
            >
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-vault-purple data-[state=active]:text-white"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-vault-purple data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-vault-purple data-[state=active]:text-white">
              Sales
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-vault-dark border-vault-purple/20">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Welcome to the admin dashboard. Use the tabs above to manage your templates, categories, users, and
                    view sales analytics.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-vault-dark border-vault-purple/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-vault-purple hover:underline cursor-pointer">Add new template</li>
                    <li className="text-vault-purple hover:underline cursor-pointer">Manage categories</li>
                    <li className="text-vault-purple hover:underline cursor-pointer">View sales report</li>
                    <li className="text-vault-purple hover:underline cursor-pointer">Manage users</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <TemplatesManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManager />
          </TabsContent>

          <TabsContent value="users">
            <UsersManager />
          </TabsContent>

          <TabsContent value="sales">
            <SalesAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
