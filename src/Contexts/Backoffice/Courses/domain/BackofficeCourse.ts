import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { BackofficeCourseDuration } from './BackofficeCourseDuration';
import { BackofficeCourseId } from './BackofficeCourseId';
import { BackofficeCourseName } from './BackofficeCourseName';

export class BackofficeCourse extends AggregateRoot {
  readonly id: BackofficeCourseId;
  readonly name: BackofficeCourseName;
  readonly duration: BackofficeCourseDuration;

  constructor(id: BackofficeCourseId, name: BackofficeCourseName, duration: BackofficeCourseDuration) {
    super();
    this.id = id;
    this.name = name;
    this.duration = duration;
  }

  // fromPrimitivesとの違い
  // 用途：ユーザが画面から新規作成ボタンを押したとき
  // IDの生成、初期状態のバリデーション、作成されましたという記録
  static create(
    id: BackofficeCourseId,
    name: BackofficeCourseName,
    duration: BackofficeCourseDuration
  ): BackofficeCourse {
    const course = new BackofficeCourse(id, name, duration);

    return course;
  }

  // プリミティブ -> ドメイン変換
  // createとの違い
  // DBからfindしてデータを取ってきたとき
  // データの詰め替えのみ。すでに過去の出来事。そのため新規のドメインイベントは発行しない
  static fromPrimitives(plainData: { id: string; name: string; duration: string }): BackofficeCourse {
    return new BackofficeCourse(
      new BackofficeCourseId(plainData.id),
      new BackofficeCourseName(plainData.name),
      new BackofficeCourseDuration(plainData.duration)
    );
  }

  // ドメイン -> 外の世界(プリミティブ)変換
  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      duration: this.duration.value
    };
  }
}
