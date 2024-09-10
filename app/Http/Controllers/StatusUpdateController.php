<?php

namespace App\Http\Controllers;

use App\Models\Line;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StatusUpdateController extends Controller
{
    public function getLinesWithLatestStatus()
    {
        $lines = Line::with('latestStatusUpdate')->get()->map(function ($line) {
            return [
                'id' => $line->id,
                'name' => $line->name,
                'color_code' => $line->color_code,
                'status' => $line->latestStatusUpdate?->status ?? '平常運転',
                'content' => $line->latestStatusUpdate?->content ?? '平常運転中',
            ];
        })->values()->all(); // 配列に変換
    
        //  APIとしてこのエンドポイントを呼び出すのでJSONで返す
        return response()->json($lines);
    }
    


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Line $line)
    {
        $statusUpdates = $line->statusUpdates()->latest()->get();

        return Inertia::render('StatusUpdates/Show', [
            'line' => $line,
            'statusUpdates' => $statusUpdates
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
