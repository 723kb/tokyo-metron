<?php

namespace App\Http\Controllers;

use App\Models\Line;
use App\Models\StatusUpdate;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StatusUpdateController extends Controller
{
    /**
     * 全路線の最新の運行状況を取得する
     *
     * @return void
     */
    public function getLinesWithLatestStatus()
    {
        // 各路線の最新の運行状況を取得し、必要な情報のみをマッピング
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
     *  新しい運行状況を保存する
     */
    public function store(Request $request)
    {
        // リクエストデータのバリデーション
        $validatedData = $request->validate([
            'line_id' => 'required|exists:lines,id',
            'status' => 'required|string',
            'content' => 'required|string',
        ]);

        // 新しい運行状況をデータベースに保存
        $statusUpdate = StatusUpdate::create($validatedData);

        // 路線別投稿一覧画面にリダイレクト
        return Inertia::render('LinePostList', [
            'line' => $statusUpdate->line,
            'latestStatus' => $statusUpdate,
        ]);
    }

    /**
     * 特定の路線の運行状況一覧を表示する
     */
    public function index($id)
    {
        // 指定されたIDの路線を取得
        $line = Line::findOrFail($id);
        // (一旦)最新10件の運行状況を取得
        $statusUpdates = $line->statusUpdates()->withCount('comments')->latest()->take(10)->get();

        // 路線別投稿一覧画面を表示
        return Inertia::render('LinePostList', [
            'lineId' => $id,
            'line' => $line,
            'statusUpdates' => $statusUpdates
        ]);
    }

    /**
     * 特定の運行状況投稿の詳細を表示する
     * 
     * コメントの作成、更新、削除はCommentControllerで行う。
     */
    public function show($lineId, $postId)
    {
        $line = Line::findOrFail($lineId);
        $statusUpdate = $line->statusUpdates()->with(['comments.user'])->findOrFail($postId);
    
        return Inertia::render('LinePostDetail', [
            'line' => $line,
            'statusUpdate' => $statusUpdate,
            'comments' => $statusUpdate->comments
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
