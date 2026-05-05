"""create users notes streaks tables

Revision ID: b788af39960e
Revises:
Create Date: 2026-05-06 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b788af39960e'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('username', sa.String(length=32), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)

    op.create_table(
        'notes',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('username', sa.String(length=32), nullable=False),
        sa.Column('syllabus_id', sa.String(length=128), nullable=False),
        sa.Column('topic', sa.String(length=256), nullable=False),
        sa.Column('week_number', sa.Integer(), nullable=False),
        sa.Column('day_number', sa.Integer(), nullable=True),
        sa.Column('note_type', sa.Enum('daily', 'weekly', name='notetype'), nullable=False),
        sa.Column('word_count', sa.Integer(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('pushed_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('valid_until', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['username'], ['users.username'], ),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_notes_username'), 'notes', ['username'], unique=False)

    op.create_table(
        'streaks',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('username', sa.String(length=32), nullable=False),
        sa.Column('current_streak', sa.Integer(), nullable=False),
        sa.Column('longest_streak', sa.Integer(), nullable=False),
        sa.Column('freeze_count', sa.Integer(), nullable=False),
        sa.Column('last_view_date', sa.Date(), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['username'], ['users.username'], ),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_streaks_username'), 'streaks', ['username'], unique=True)


def downgrade() -> None:
    op.drop_index(op.f('ix_streaks_username'), table_name='streaks')
    op.drop_table('streaks')
    op.drop_index(op.f('ix_notes_username'), table_name='notes')
    op.drop_table('notes')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_table('users')
    sa.Enum(name='notetype').drop(op.get_bind())
