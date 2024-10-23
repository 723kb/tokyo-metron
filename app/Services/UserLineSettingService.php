<?php

namespace App\Services;

use App\Models\UserLineSetting;
use App\Models\Line;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserLineSettingService
{  
  /**
   * 現在のユーザーのお気に入り路線と設定を取得
   *
   * favorite_flagがtrue = 1 のもの
   * @return void
   */
  public function getFavoriteLineSettings()
  {
    return UserLineSetting::where('user_id', Auth::id())
      ->where('favorite_flag', true)
      ->with('line')  // 関連する路線情報も取得
      ->get();
  }
  
  /**
   * 丸ノ内線支線を除く全路線を取得
   *
   * @return void
   */
  public function getLines()
  {
    return Line::where('name', '!=', '丸ノ内線支線')
      ->select('id', 'name', 'color_code')
      ->get();
  }
  
  /**
   * 選択された各路線をお気に入りとして保存
   *
   * @param  mixed $lineIds
   * @return void
   */
  public function storeFavorites(array $lineIds)
  {
    foreach ($lineIds as $lineId) {
      UserLineSetting::updateOrCreate(
        ['user_id' => Auth::id(), 'line_id' => $lineId],
        ['favorite_flag' => true]
      );
    }
  }
  
  /**
   * ユーザーのお気に入り路線IDを取得
   *
   * @return void
   */
  public function getFavoriteLineIds()
  {
    return UserLineSetting::where('user_id', Auth::id())
      ->where('favorite_flag', true)
      ->pluck('line_id')
      ->toArray();
  }
  
  /**
   * お気に入り設定を更新
   *
   * @param  mixed $lineIds
   * @return void
   */
  public function updateFavorites(array $lineIds)
  {
    // トランザクション開始
    DB::transaction(function () use ($lineIds) {
      // 全てのお気に入りを一旦 false = 0 に設定
      UserLineSetting::where('user_id', Auth::id())->update(['favorite_flag' => false]);

      // 選択された路線を true = 1 に設定
      foreach ($lineIds as $lineId) {
        UserLineSetting::updateOrCreate(
          ['user_id' => Auth::id(), 'line_id' => $lineId],
          ['favorite_flag' => true]
        );
      }
    });
  }
  
  /**
   * 指定されたIDのお気に入りを削除
   *
   * @param  mixed $id
   * @return void
   */
  public function deleteFavorite($id)
  {
    // 指定されたIDのお気に入り設定を取得
    $favorite = UserLineSetting::findOrFail($id);
    // ユーザーが自分のお気に入りのみを削除できるようにチェック
    if (Auth::id() !== $favorite->user_id) {
      throw new \Exception('このお気に入りを削除する権限がありません。');
    }
    $favorite->delete();
  }
    
  /**
   * 通知設定を更新
   *
   * @param  mixed $settings
   * @return void
   */
  public function updateNotificationSettings(array $settings)
  {
    // トランザクション開始
    DB::transaction(function () use ($settings) {
      foreach ($settings as $setting) {
        UserLineSetting::findOrFail($setting['id'])->update($setting);
      }
    });
  }
}
