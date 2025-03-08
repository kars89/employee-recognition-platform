import React from "react";

export function TopRecognizers() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-xl font-semibold mb-4">Top Recognizers</h2>
      <div className="space-y-4">
        {/* Placeholder content - replace with actual data */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              JD
            </div>
            <div>
              <p className="font-medium">Jane Doe</p>
              <p className="text-sm text-muted-foreground">15 recognitions</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              JS
            </div>
            <div>
              <p className="font-medium">John Smith</p>
              <p className="text-sm text-muted-foreground">12 recognitions</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              AB
            </div>
            <div>
              <p className="font-medium">Alice Brown</p>
              <p className="text-sm text-muted-foreground">10 recognitions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}